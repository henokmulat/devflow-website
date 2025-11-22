import ROUTES from "@/constants/routes";
import { getTimeStamp } from "@/lib/utils";
import { create } from "domain";
import Link from "next/link";

interface Props {
  question: Question;
}

const QuestionCard = ({
  question: { _id, title, tags, author, createdAt, upvotes, answers, views },
}: Props) => {
  return (
    <div className="card-wrapper rounded[10px] p-9 sm:px-11">
      <div className="flex  flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span>{getTimeStamp(createdAt)}</span>
          <Link href={ROUTES.QUESTION(_id)}>
            <h3 className="sm:semi-bold base-semi-bold text-dark200_light900 line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
