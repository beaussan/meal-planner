import React from 'react';
import ReactDOM from 'react-dom';
import { addDays, format, getDayOfYear } from 'date-fns';
import { fr } from 'date-fns/locale';
import './styles/tailwind.css';

const feculants = [
  'riz',
  'pates',
  'pomme de terre',
  'haricots blancs / rouges',
  'Pois chiches'
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
const nmbDay = 10;

function getDays() {
  return Array.from(Array(nmbDay).keys()).map(val => addDays(new Date(), val));
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
    <div className="w-auto rounded overflow-hidden shadow-lg mb-6 bg-white">
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

function App() {
  const days = getDays();
  return (
    <div className="bg-gray-300">
      <div className="container mx-auto p-10">
        <h1 className="text-l font-bold mb-5">Meal planer</h1>
        {days.map(day => (
          <MealCard {...getForDay(day)} />
        ))}
      </div>
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
