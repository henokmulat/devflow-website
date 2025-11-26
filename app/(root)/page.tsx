import { auth } from "@/auth";
import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilter from "@/components/filters/HomeFilter";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import handleError from "@/lib/handlers/error";
import { NotFoundError, ValidationError } from "@/lib/http-error";
import Link from "next/link";
import { title } from "process";

const questions = [
  {
    _id: "1",
    title: "How to learn React",
    description: "I want to learn React, can anyone help me?",
    tags: [
      { _id: "1", name: "React" },
      { _id: "2", name: "Javascript" },
    ],
    author: {
      _id: "1",
      name: "John doe",
      image:
        "data:image/png;base64,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",
    },
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: new Date("2023-01-01"),
  },
  {
    _id: "2",
    title: "How to learn Javascript",
    description: "I want to learn React, can anyone help me?",
    tags: [
      { _id: "1", name: "React" },
      { _id: "2", name: "Javascript" },
    ],
    author: {
      _id: "1",
      name: "John doe",
      image:
        "data:image/png;base64,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",
    },
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: new Date("2023-01-01"),
  },
];

const test = async () => {
  try {
    throw new ValidationError({
      title: ["Required"],
      tags: ["'Javascript' is not a valid tag"],
    });
  } catch (error) {
    return handleError(error);
  }
};

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}
const Home = async ({ searchParams }: SearchParams) => {
  const result = await test();
  const { query = "", filter = "" } = await searchParams;
  const filteredQuestions = questions.filter((question) => {
    const matchesQuery = query
      ? question.title.toLowerCase().includes(query.toLowerCase())
      : true;
    const matchesFilter = filter
      ? question.tags[0].name?.toLowerCase() === filter.toLowerCase()
      : true;
    return matchesQuery && matchesFilter;
  });

  return (
    <>
      <section className="flex w-full flex-col-reverse sm:flex-row justify-between gap-4 sm:items-center">
        <h1 className="text-3xl text-dark100_light900">All Questions</h1>
        <Button
          className="primary-gradient min-h-[46px] px-4 py-3 text-light-900!"
          asChild
        >
          <Link href={ROUTES.ASK_QUESTION}>Ask a Question</Link>
        </Button>
      </section>
      <section className="mt-11">
        <LocalSearch
          route="/"
          imgSrc="/icons/search.svg"
          placeholder="Search questions..."
          otherClasses="flex-1"
        />
      </section>
      <HomeFilter />
      <div className="mt-10 flex w-full flex-col gap-6">
        {filteredQuestions.map((question) => (
          <QuestionCard key={question._id} question={question} />
        ))}
      </div>
    </>
  );
};

export default Home;
