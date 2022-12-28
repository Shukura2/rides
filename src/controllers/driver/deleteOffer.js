import Model from '../../models/model';

export const deleteOfferModel = new Model('ride_offer');

export const deleteOffer = async (req, res) => {
  const { driverId } = req.user.userInfo;
  const { offerId } = req.params;
  const clause = `ride_offer_id = '${offerId}' AND driver_id = '${driverId}'`;
  try {
    const data = await deleteOfferModel.deleteFromTable(clause);
    res.status(200).json({ message: 'Ride offer deleted', success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
