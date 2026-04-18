import css from './Statistics.module.css';
interface StatisticsProps {
  readPercentage: number;
  pagesRead: number
}
export default function Statistics({ readPercentage, pagesRead }: StatisticsProps) {
const size = 116; 
const strokeWidth = 10;
const radius = (size - strokeWidth) / 2; 
const center = size / 2; 
const circumference = 2 * Math.PI * radius;
 const safePercentage = Math.min(Math.max(readPercentage, 0), 100);
const offset = circumference - (safePercentage / 100) * circumference;
 
 
  return (
    
      <div className={css.statDiagram}>
        <div className={css.wrapper}>
          <svg viewBox={`0 0 ${size} ${size}`} className={css.svg}>
            <circle
              cx={center}
              cy={center}
              r={radius}
              stroke="var(--card-background)"
              strokeWidth={strokeWidth}
              fill="none"
            />

            <circle
              cx={center}
          cy={center}
          r={radius}
              stroke="var(--success)"
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              style={{ strokeDashoffset: offset }}
              transform={`rotate(-90 ${center} ${center})`}
              className={css.progressCircle}
            />

            <text
              x={center}
          y={center}
              dominantBaseline="middle"
              textAnchor="middle"
              className={css.text}
            >
              {safePercentage === 100 || safePercentage === 0
                ? Math.round(safePercentage)
                : safePercentage}
              %
            </text>
          </svg>
        </div>
        <div className={css.infoBlock}>
            <div className={css.greenIcon}></div>
            <div className={css.info}>
                <p className={css.percentage}>{safePercentage}%</p>
                <p className={css.pagesRead}>{pagesRead} pages read</p>
            </div>
        </div>
      </div>
  
  );
}
