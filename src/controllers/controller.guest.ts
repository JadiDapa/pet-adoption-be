import {
  getAllGuests,
  getFilteredGuests,
  getGuestById,
  createGuest,
  updateGuest,
  deleteGuest,
  getPaginatedGuests,
  getTotalGuest
} from '../models/model.guest';
import ErrorResponse from '../helpers/helper.error';
import SuccessResponse from '../helpers/helper.success';
import { Guests } from '@prisma/client';

export const handleGetAllGuests = async (req: any, res: any) => {
  try {
    const result = await getAllGuests();
    return SuccessResponse.DataFound(req, res, 'All Data Found', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleGetTotalGuest = async (req: any, res: any) => {
  try {
    const { start, end } = req.query;

    const startDate = start ? new Date(start) : null;
    const endDate = end ? new Date(end) : null;

    if (endDate) {
      endDate.setDate(endDate.getDate() + 1);
    }

    const result = await getTotalGuest(startDate, endDate);

    return SuccessResponse.DataFound(req, res, 'Paginated Data Found', result);
  } catch (error) {
    console.log(error);
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleFilterGuests = async (req: any, res: any) => {
  try {
    const { pageIndex, name, start, end } = req.query;

    const page = parseInt(pageIndex) || 0;

    const startDate = start ? new Date(start) : null;
    const endDate = end ? new Date(end) : null;

    if (endDate) {
      endDate.setDate(endDate.getDate() + 1);
    }

    if (name || startDate || endDate) {
      const result = await getFilteredGuests(name, startDate, endDate, page);
      return SuccessResponse.DataFound(req, res, 'Filtered Data Found', result);
    }

    const result = await getPaginatedGuests(page);
    return SuccessResponse.DataFound(req, res, 'Paginated Data Found', result);
  } catch (error) {
    console.log(error);
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleGetGuestById = async (req: { params: { guestId: string } }, res: any) => {
  try {
    const guestId = req.params.guestId;
    const result = await getGuestById(guestId);
    return SuccessResponse.DataFound(req, res, 'A Data Found', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleCreateGuest = async (req: { body: Guests }, res: any) => {
  try {
    const data = req.body;
    const result = await createGuest(data);
    return SuccessResponse.DataFound(req, res, 'New Data Created', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleUpdateGuest = async (
  req: { params: { guestId: string }; body: Guests },
  res: any
) => {
  try {
    const guestId = req.params.guestId;
    const data = req.body;
    const result = await updateGuest(guestId, data);
    return SuccessResponse.DataFound(req, res, 'Existing Data Updated', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleDeleteGuest = async (req: { params: { guestId: string } }, res: any) => {
  try {
    const guestId = req.params.guestId;
    const result = await deleteGuest(guestId);
    return SuccessResponse.DataFound(req, res, 'Existing Data Deleted', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};
