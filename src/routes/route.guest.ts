import { Router } from 'express';
import {
  handleGetAllGuests,
  handleFilterGuests,
  handleGetGuestById,
  handleCreateGuest,
  handleUpdateGuest,
  handleDeleteGuest,
  handleGetTotalGuest
} from '../controllers/controller.guest';
import { verifyToken } from '../middleware/verify-token.middleware';

const GuestRouter = Router();

GuestRouter.get('/guests', verifyToken, handleGetAllGuests);
GuestRouter.get('/guests/total', handleGetTotalGuest);
GuestRouter.get('/guests/filter', verifyToken, handleFilterGuests);
GuestRouter.get('/guests/:guestId', verifyToken, handleGetGuestById);
GuestRouter.post('/guests', handleCreateGuest);
GuestRouter.put('/guests/:guestId', verifyToken, handleUpdateGuest);
GuestRouter.delete('/guests/:guestId', verifyToken, handleDeleteGuest);

export default GuestRouter;
