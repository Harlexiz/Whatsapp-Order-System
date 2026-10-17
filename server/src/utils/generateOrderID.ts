import {customAlphabet} from 'nanoid'


const nanoid = customAlphabet("23456789ABCDEFGHJKMNPQRSTUVWXYZ", 6);

export const generateOrderId = () => `ORD-${nanoid()}`;