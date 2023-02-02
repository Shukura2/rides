import Model from '../../models/model';

export const editOfferModel = new Model('ride_offer');

export const editRideOffer = async (req, res) => {
  const data = req.body;
  const { offerId } = req.params;
  const { userId } = req.user.userInfo;
  const clause = `WHERE ride_offer_id = '${offerId}' AND driver_id = '${userId}'`;
  try {
    const dataInfo = await editOfferModel.editFromTable(data, clause);
    res
      .status(200)
      .json({ message: 'Offer updated successfully', success: true });
  } catch (error) {
    console.log('error = ', error);
    res.status(500).json({ message: error.message, success: false });
  }
};
