import { ReadingProgress } from '@/app/types/book';
import css from './Diary.module.css';
import { formatDate, getSessionDuration } from '@/app/_utils/utils';

interface DiaryProps {
  sessionList: ReadingProgress[];
  totalPages: number;
  onClick: (id: string) => void;
  
}

export default function Diary({
  sessionList,
  totalPages,
  onClick,
  
}: DiaryProps) {
  const completedSessions = sessionList.filter((s) => s.status === 'inactive');

  return (
    <div className={css.diary}>
      <ul className={css.sessionList}>
        {completedSessions.map((session, index) => {
          const duration = getSessionDuration(
            session.startReading,
            session.finishReading
          );
          const sessionPages = session.finishPage - session.startPage;
          const sessionPercentage =
            totalPages > 0
              ? Number(((sessionPages / totalPages) * 100).toFixed(1))
              : 0;
          
          return (
            <li key={session._id} className={css.sessionItem}>
              <div
                className={`${css.marker} ${index === 0 ? css.markerActive : ''}`}
              ></div>

              <div className={css.dateAndPages}>
                <p className={css.date}>{formatDate(session.finishReading)}</p>
                <p className={css.pagesRead}>{sessionPages} pages</p>
              </div>
              <div className={css.percentageAndSpeed}>
                <div className={css.percentageAndTime}>
                  <p className={css.percentage}>{sessionPercentage}%</p>
                  <p className={css.time}>{duration} minutes</p>
                </div>
                <div className={css.speed}>
                  <div className={css.speedIconAndText}>
                    <div className={css.speedIcon}></div>
                    <div className={css.speedText}>
                      {session.speed} pages per hour
                    </div>
                  </div>
                  <button
                    type="button"
                    className={css.delBtn}
                    onClick={() => onClick(session._id || '')}
                  >
                    D
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
