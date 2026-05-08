import Link from 'next/link';
import type { Note } from '@/types/note';
import styles from './NoteItem.module.css';

type Props = {
  item: Note;
};

const NoteItem = ({ item }: Props) => {
  return (
    <li className={styles.item}>
      <Link href={`/notes/${item.id}`} style={{ color: 'white', textDecoration: 'none' }}>
        {item.title}
      </Link>
    </li>
  );
};

export default NoteItem;
