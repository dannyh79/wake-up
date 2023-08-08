import { useEffect, useState } from 'preact/hooks';
import type { JSX } from 'preact';
import * as utils from '@/lib';

const RANDOM_INT_RANGE = {
  max: 20,
  min: 1,
};

export const INDICATOR_TEXT = {
  correct: 'correct',
  wrong: 'wrong',
};

export const ids = {
  answer: 'answer',
  baseNumber: 'baseNumber',
  indicator: 'indicator',
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
  form: { answer: number };
  onClickSubmit: JSX.GenericEventHandler<HTMLButtonElement>;
  onInputChange: JSX.GenericEventHandler<HTMLInputElement>;
  onSubmit: JSX.GenericEventHandler<HTMLFormElement>;
}

const AnswerForm = ({
  form,
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
      value={form.answer}
      onInput={onInputChange}
    />
    <button data-testid={ids.submit} type="submit" onClick={onClickSubmit}>
      Submit
    </button>
  </form>
);

const genQuizNumsByRange = () => ({
  base: utils.generateRandomInteger(RANDOM_INT_RANGE),
  multiplier: utils.generateRandomInteger(RANDOM_INT_RANGE),
});

export const Home = () => {
  const [answer, setAnswer] = useState<number>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

  const [numbers, setNumbers] = useState(genQuizNumsByRange());

  useEffect(() => {
    if (submitted && isAnswerCorrect) {
      setNumbers(genQuizNumsByRange());
      setAnswer(null);
    }
  }, [isAnswerCorrect, submitted]);

  return (
    <>
      <h1>Wake Up!</h1>
      <div data-testid={ids.quiz}>
        <Quiz baseNumber={numbers.base} multiplier={numbers.multiplier} />
        <AnswerForm
          form={{ answer }}
          onSubmit={(event) => {
            event.preventDefault();
            setIsAnswerCorrect(answer === numbers.base * numbers.multiplier);
          }}
          onInputChange={(event) => {
            setSubmitted(false);

            const inputString = (event.target as HTMLInputElement).value;
            if (inputString !== '' && !isNaN(Number(inputString))) {
              setAnswer(Number(inputString));
            }
          }}
          onClickSubmit={() => {
            setSubmitted(true);
          }}
        />
        {submitted && (
          <div data-testid={ids.indicator}>
            {isAnswerCorrect ? INDICATOR_TEXT.correct : INDICATOR_TEXT.wrong}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
