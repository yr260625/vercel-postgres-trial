"use server";
import { sql } from "@vercel/postgres";

type uploadedImage = {
  title: string;
  thumbnail: string;
  description: string;
};

export async function uploadImage({ title, thumbnail, description }: uploadedImage) {
  try {
    const data =
      await sql`insert into uploaded_images(id, title, thumbnail, description, created_at) values (
      ${crypto.randomUUID()},
       ${title},
       ${thumbnail},
       ${description},
       current_timestamp
      )`;
  } catch (error) {
    console.log(error);
  }
}
