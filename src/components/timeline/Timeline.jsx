export default function Timeline({ profiles }) {
  return (
    <div className="border rounded-2xl p-4 not-prose">
      <div className="w-full overflow-auto">
        <ul className="timeline my-0 pl-0">
          {profiles.map((item, index) => (
            <li className="m-0 p-0" key={item.year}>
              {index > 0 && <hr />}
              <div className="timeline-start">{item.year}</div>
              <TimelineMiddle />
              <div className="timeline-end timeline-box">{item.label}</div>
              {index !== profiles.length - 1 && index <= profiles.length && <hr />}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function TimelineMiddle() {
  return (
    <div className="timeline-middle">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
          clipRule="evenodd"
        ></path>
      </svg>
    </div>
  );
}
