import { useEffect, useState } from 'preact/hooks';
import type { JSX } from 'preact';

const RANDOM_INT_RANGE = {
  max: 20,
  min: 1,
};

const generateRandomInteger = ({ min, max }: Record<string, number>) => {
  const minInt = Math.ceil(min);
  const maxInt = Math.floor(max);
  return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt;
};

export const ids = {
  answer: 'answer',
  baseNumber: 'baseNumber',
  multiplier: 'multiplier',
  quiz: 'quiz',
  submit: 'submit',
};

const Quiz = ({ baseNumber, multiplier }: Record<string, number>) => (
  <p>
    What is the product of{' '}
    <span data-testid={ids.baseNumber}>{baseNumber}</span> times{' '}
    <span data-testid={ids.multiplier}>{multiplier}</span>?
  </p>
);

interface AnswerFormProps {
  onClickSubmit: JSX.GenericEventHandler<HTMLButtonElement>;
  onInputChange: JSX.GenericEventHandler<HTMLInputElement>;
  onSubmit: JSX.GenericEventHandler<HTMLFormElement>;
}

const AnswerForm = ({
  onClickSubmit,
  onInputChange,
  onSubmit,
}: AnswerFormProps) => (
  <form onSubmit={onSubmit}>
    <label for={ids.answer}>Your Answer: </label>
    <input
      data-testid={ids.answer}
      type="text"
      inputMode="numeric"
      id={ids.answer}
      onInput={onInputChange}
    />
    <button data-testid={ids.submit} type="submit" onClick={onClickSubmit}>
      Submit
    </button>
  </form>
);

const genQuizNumsByRange = () => ({
  base: generateRandomInteger(RANDOM_INT_RANGE),
  multiplier: generateRandomInteger(RANDOM_INT_RANGE),
});

export const Home = () => {
  const [answer, setAnswer] = useState<number>(0);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

  const [numbers, setNumbers] = useState(genQuizNumsByRange());

  useEffect(() => {
    if (submitted && isAnswerCorrect) {
      setNumbers(genQuizNumsByRange());
    }
  }, [isAnswerCorrect, submitted]);

  return (
    <>
      <h1>Wake Up!</h1>
      <div data-testid={ids.quiz}>
        <Quiz baseNumber={numbers.base} multiplier={numbers.multiplier} />
        <AnswerForm
          onSubmit={(event) => {
            event.preventDefault();
            setIsAnswerCorrect(answer === numbers.base * numbers.multiplier);
          }}
          onInputChange={(event) => {
            setSubmitted(false);

            const value = Number((event.target as HTMLInputElement).value);
            setAnswer(value);
          }}
          onClickSubmit={() => {
            setSubmitted(true);
          }}
        />
        {submitted && <div>{isAnswerCorrect ? 'correct' : 'wrong'}</div>}
      </div>
    </>
  );
};

export default Home;
