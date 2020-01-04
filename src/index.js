import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { addDays, format, getDayOfYear } from 'date-fns';
import { fr } from 'date-fns/locale';
import './tailwind.css';

const feculants = [
  'riz',
  'pates',
  'pomme de terre',
  'haricots blancs / rouges'
];
const legumes = [
  'epinards',
  'ratatouille',
  'courgettes',
  'haricauts vert',
  'petits poids',
  'poireaux',
  'tomates',
  'carottes'
];
const viandes = ['oeuf', 'cordon bleu', 'poisson', 'tofu', 'steaks'];
// const nmbDay = 10;

function paseNumber(nmb) {
  try {
    return parseInt(nmb);
  } catch (error) {
    return undefined;
  }
}

function getDays(nmb) {
  if (!nmb || nmb <= 0) {
    return [];
  }
  console.log('generating ', nmb, typeof nmb);
  return Array.from(Array(nmb).keys())
    .map(val => addDays(new Date(), val))
    .map(val => getForDay(val));
}

function formatDate(date) {
  return format(date, 'PPPP', { locale: fr });
}

function getArr(num, arr) {
  return arr[num % arr.length];
}

function getForDay(date) {
  const num = getDayOfYear(date);
  return {
    date: formatDate(date),
    key: formatDate(date),
    feculant: getArr(num, feculants),
    legume: getArr(num, legumes),
    viande: getArr(num, viandes)
  };
}

function MealCard({ date, feculant, legume, viande }) {
  return (
    <div className="w-auto rounded overflow-hidden shadow-lg print:shadow-none mb-6 bg-white w-full print:w-1/2">
      <div className="px-6 py-4">
        <h1 className="text-xl mb-2 font-bold">Pour {date}</h1>
        <p className="text-grey-darker text-base flex">
          <span className="w-1/3">{feculant}</span>
          <span className="w-1/3">{legume}</span>
          <span className="w-1/3">{viande}</span>
        </p>
      </div>
    </div>
  );
}
const defaultVal = getDays(2);

function App() {
  const [nmbDays, setNmbDays] = useState(3);
  const [days, setDays] = useState(defaultVal);

  useEffect(() => {
    setDays(getDays(nmbDays));
  }, [nmbDays]);

  const input = (
    <div className="md:flex md:items-center mb-6 print:hidden">
      <div className="md:w-1/3">
        <label
          className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
          htmlFor="inline-number"
        >
          Nombre de jours
        </label>
      </div>
      <div className="md:w-2/3">
        <input
          name="days"
          value={nmbDays}
          type="number"
          onChange={e => setNmbDays(paseNumber(e.target.value))}
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          id="inline-number"
        ></input>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-300 print:bg-white">
      <div className="container mx-auto p-10">
        <div className="flex">
          <h1 className="text-l font-bold mb-5 w-1/2">
            Meal planer pour {nmbDays} jours
          </h1>
          {input}
        </div>
        <div className="flex flex-wrap">
          {days.map(day => (
            <MealCard {...day} />
          ))}
        </div>
      </div>
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
