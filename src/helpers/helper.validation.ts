import { News, Products } from '@prisma/client';
import z from 'zod';

class Validation {
  static async createGuest(data: Products) {
    const schema = z.object({
      name: z.string(),
      instanc: z.string(),
      addrress: z.string(),
      phone_number: z.string().optional(),
      purpose: z.string().optional()
    });

    return schema.parse(data);
  }

  static async createNews(data: News) {
    const schema = z.object({
      title: z.string(),
      slug: z.string(),
      content: z.string(),
      image: z.string(),
      view_count: z.number()
    });

    return schema.parse(data);
  }

  static async createProduct(data: Products) {
    const schema = z.object({
      name: z.string(),
      slug: z.string(),
      price: z.string().optional(),
      seller: z.string(),
      location: z.string(),
      phone_number: z.string(),
      description: z.string().optional(),
      image: z.string()
    });

    return schema.parse(data);
  }
}

export default Validation;
