import { Prisma, PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();
const DEFAULT_LIMIT = 12;
const MAX_LIMIT = 50;

const getTourAmount = async (_req: Request, res: Response) => {
    try {
        const tourAmount = await prisma.tour.count();
        return res.status(200).json({ message: 'Lấy số lượng tour thành công', tourAmount });
    } catch (error) {
        console.error('Lỗi lấy số lượng tour:', error);
        return res.status(500).json({ message: 'Không thể lấy số lượng tour.' });
    }
};

const getTour = async (req: Request, res: Response) => listTours(req, res);
const searchTour = async (req: Request, res: Response) => listTours(req, res);

const getFeaturedTours = async (req: Request, res: Response) => {
    try {
        const limit = parseBoundedInteger(req.query.limit, 4, 1, 12);
        const candidates = await prisma.tour.findMany({
            where: { availableSeats: { gt: 0 } },
            orderBy: [{ isTrending: 'desc' }, { createdAt: 'desc' }],
            take: 40,
        });
        const withRatings = await addTourRatings(candidates);
        const tours = withRatings
            .sort((a, b) => Number(b.isTrending) - Number(a.isTrending) || b.averageRating - a.averageRating || b.reviewCount - a.reviewCount)
            .slice(0, limit);
        return res.status(200).json({ message: 'Lấy tour nổi bật thành công', tours });
    } catch (error) {
        if (error instanceof TourQueryError) return res.status(400).json({ message: error.message });
        console.error('Lỗi lấy tour nổi bật:', error);
        return res.status(500).json({ message: 'Không thể tải tour nổi bật.' });
    }
};

const getTrendingTours = async (req: Request, res: Response) => {
    try {
        const limit = parseBoundedInteger(req.query.limit, 6, 1, 12);
        const tours = await prisma.tour.findMany({
            where: { isTrending: true, availableSeats: { gt: 0 } },
            orderBy: { createdAt: 'desc' },
            take: limit,
        });
        return res.status(200).json({ message: 'Lấy tour thịnh hành thành công', tours: await addTourRatings(tours) });
    } catch (error) {
        if (error instanceof TourQueryError) return res.status(400).json({ message: error.message });
        console.error('Lỗi lấy tour thịnh hành:', error);
        return res.status(500).json({ message: 'Không thể tải tour thịnh hành.' });
    }
};

const getPromotionTours = async (req: Request, res: Response) => {
    try {
        const limit = parseBoundedInteger(req.query.limit, 6, 1, 12);
        const candidates = await prisma.tour.findMany({
            where: { discountPrice: { not: null }, availableSeats: { gt: 0 } },
            orderBy: { createdAt: 'desc' },
            take: 100,
        });
        const tours = candidates
            .filter((tour) => tour.discountPrice !== null && Number(tour.discountPrice) < Number(tour.price))
            .sort((a, b) => {
                const discountA = 1 - Number(a.discountPrice) / Number(a.price);
                const discountB = 1 - Number(b.discountPrice) / Number(b.price);
                return discountB - discountA;
            })
            .slice(0, limit);
        return res.status(200).json({ message: 'Lấy tour ưu đãi thành công', tours: await addTourRatings(tours) });
    } catch (error) {
        if (error instanceof TourQueryError) return res.status(400).json({ message: error.message });
        console.error('Lỗi lấy tour ưu đãi:', error);
        return res.status(500).json({ message: 'Không thể tải tour ưu đãi.' });
    }
};

const getTopReviews = async (req: Request, res: Response) => {
    try {
        const limit = parseBoundedInteger(req.query.limit, 6, 1, 12);
        const reviews = await prisma.review.findMany({
            where: { rating: { gte: 4 }, comment: { not: null } },
            orderBy: [{ rating: 'desc' }, { createdAt: 'desc' }],
            take: limit,
            select: {
                id: true,
                rating: true,
                comment: true,
                createdAt: true,
                user: { select: { fullName: true, avatarUrl: true } },
                tour: { select: { id: true, title: true, destination: true, images: true } },
            },
        });
        return res.status(200).json({ message: 'Lấy đánh giá nổi bật thành công', reviews });
    } catch (error) {
        if (error instanceof TourQueryError) return res.status(400).json({ message: error.message });
        console.error('Lỗi lấy đánh giá nổi bật:', error);
        return res.status(500).json({ message: 'Không thể tải đánh giá nổi bật.' });
    }
};

async function listTours(req: Request, res: Response) {
    try {
        const page = parseBoundedInteger(req.query.page, 1, 1, 1_000_000);
        const limit = parseBoundedInteger(req.query.limit, DEFAULT_LIMIT, 1, MAX_LIMIT);
        const where = buildTourFilters(req);
        const orderBy = getSortOrder(req.query.sort);
        const [tours, totalItems] = await Promise.all([
            prisma.tour.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy,
            }),
            prisma.tour.count({ where }),
        ]);
        return res.status(200).json({
            message: 'Lấy danh sách tour thành công',
            tours: await addTourRatings(tours),
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalItems / limit),
                totalItems,
                limit,
            },
        });
    } catch (error) {
        if (error instanceof TourQueryError) {
            return res.status(400).json({ message: error.message });
        }
        console.error('Lỗi lấy danh sách tour:', error);
        return res.status(500).json({ message: 'Không thể tải danh sách tour.' });
    }
}

async function addTourRatings<T extends { id: string }>(tours: T[]) {
    if (tours.length === 0) return tours.map((tour) => ({ ...tour, averageRating: 0, reviewCount: 0 }));
    const ratings = await prisma.review.groupBy({
        by: ['tourId'],
        where: { tourId: { in: tours.map((tour) => tour.id) } },
        _avg: { rating: true },
        _count: { id: true },
    });
    const ratingByTour = new Map(ratings.map((rating) => [rating.tourId, {
        averageRating: rating._avg.rating ?? 0,
        reviewCount: rating._count.id,
    }]));
    return tours.map((tour) => ({
        ...tour,
        averageRating: ratingByTour.get(tour.id)?.averageRating ?? 0,
        reviewCount: ratingByTour.get(tour.id)?.reviewCount ?? 0,
    }));
}

const getTourById = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (typeof id !== 'string') return res.status(400).json({ message: 'Mã tour không hợp lệ.' });
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) {
        return res.status(400).json({ message: 'Mã tour không hợp lệ.' });
    }

    try {
        const [tour, rating] = await Promise.all([
            prisma.tour.findUnique({
                where: { id },
                include: {
                    reviews: {
                        orderBy: { createdAt: 'desc' },
                        take: 10,
                        select: {
                            id: true,
                            rating: true,
                            comment: true,
                            createdAt: true,
                            user: { select: { fullName: true, avatarUrl: true } },
                        },
                    },
                },
            }),
            prisma.review.aggregate({ where: { tourId: id }, _avg: { rating: true }, _count: { id: true } }),
        ]);

        if (!tour) return res.status(404).json({ message: 'Không tìm thấy tour.' });
        return res.status(200).json({
            message: 'Lấy chi tiết tour thành công',
            tour: {
                ...tour,
                averageRating: rating._avg?.rating ?? 0,
                reviewCount: rating._count?.id ?? 0,
            },
        });
    } catch (error) {
        console.error('Lỗi lấy chi tiết tour:', error);
        return res.status(500).json({ message: 'Không thể tải chi tiết tour.' });
    }
};

function parseBoundedInteger(value: unknown, fallback: number, min: number, max: number): number {
    if (value === undefined) return fallback;
    if (typeof value !== 'string' || !/^\d+$/.test(value)) {
        throw new TourQueryError('Tham số phân trang phải là số nguyên dương.');
    }
    const parsed = Number(value);
    if (!Number.isSafeInteger(parsed) || parsed < min || parsed > max) {
        throw new TourQueryError(`Giá trị phải nằm trong khoảng ${min} đến ${max}.`);
    }
    return parsed;
}

function buildTourFilters(req: Request): Prisma.TourWhereInput {
    const where: Prisma.TourWhereInput = {};
    const destination = getStringQuery(req, 'destination')?.trim();
    const type = getStringQuery(req, 'type')?.trim();
    const keyword = getStringQuery(req, 'keyword')?.trim();
    const budgetText = getStringQuery(req, 'budget');
    const dateText = getStringQuery(req, 'date');

    if (destination) where.destination = { contains: destination, mode: 'insensitive' };
    if (type) where.tourType = { equals: type, mode: 'insensitive' };
    if (keyword) {
        where.OR = [
            { title: { contains: keyword, mode: 'insensitive' } },
            { description: { contains: keyword, mode: 'insensitive' } },
            { destination: { contains: keyword, mode: 'insensitive' } },
        ];
    }
    if (budgetText !== undefined) {
        const budget = Number(budgetText);
        if (!Number.isFinite(budget) || budget <= 0) throw new TourQueryError('Ngân sách phải là số lớn hơn 0.');
        where.OR = [
            ...(where.OR ?? []),
            { discountPrice: { lte: budget } },
            { discountPrice: null, price: { lte: budget } },
        ];
        // Keep keyword matching and the price cap as separate AND conditions.
        if (keyword) {
            const keywordFilter = where.OR.slice(0, 3);
            where.AND = [{ OR: keywordFilter }, { OR: where.OR.slice(3) }];
            delete where.OR;
        }
    }
    if (dateText !== undefined) {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(dateText)) throw new TourQueryError('Ngày phải có định dạng YYYY-MM-DD.');
        const date = new Date(`${dateText}T00:00:00.000Z`);
        if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== dateText) {
            throw new TourQueryError('Ngày khởi hành không hợp lệ.');
        }
        const nextDay = new Date(date);
        nextDay.setUTCDate(nextDay.getUTCDate() + 1);
        where.startDate = { gte: date, lt: nextDay };
    }
    return where;
}

function getStringQuery(req: Request, key: string): string | undefined {
    const value = req.query[key];
    if (value === undefined) return undefined;
    if (typeof value !== 'string') throw new TourQueryError(`Tham số ${key} không hợp lệ.`);
    return value;
}

function getSortOrder(sort: unknown): Prisma.TourOrderByWithRelationInput | Prisma.TourOrderByWithRelationInput[] {
    if (sort === undefined || sort === 'newest') return { createdAt: 'desc' };
    if (sort === 'oldest') return { createdAt: 'asc' };
    if (sort === 'price_asc') return [{ discountPrice: { sort: 'asc', nulls: 'last' } }, { price: 'asc' }];
    if (sort === 'price_desc') return [{ discountPrice: { sort: 'desc', nulls: 'last' } }, { price: 'desc' }];
    if (sort === 'popular') return { isTrending: 'desc' };
    if (typeof sort !== 'string') throw new TourQueryError('Thứ tự sắp xếp không hợp lệ.');
    throw new TourQueryError('Thứ tự sắp xếp được hỗ trợ: newest, oldest, price_asc, price_desc, popular.');
}

class TourQueryError extends Error {}

export default {
    getTourAmount,
    getTour,
    searchTour,
    getTourById,
    getFeaturedTours,
    getTrendingTours,
    getPromotionTours,
    getTopReviews,
};
