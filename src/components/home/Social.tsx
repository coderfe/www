import { type Social } from '@/consts';
import { motion } from 'framer-motion';

type Props = {
  social: Social;
};

export default function Social({ social: { icon, color } }: Props) {
  return (
    <span
      className="size-8 rounded-full flex justify-center items-center text-white"
      style={{ backgroundColor: color }}
    >
      <motion.span whileHover={{ scale: 1.2 }} className={`iconify icon-[tabler--${icon}]`}></motion.span>
    </span>
  );
}
