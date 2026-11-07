import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
/** ใส่ที่ controller/handler ที่ไม่ต้อง login (ค่าเริ่มต้นทุก route ถูกล็อกไว้หมด) */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
