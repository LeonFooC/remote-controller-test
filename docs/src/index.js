import React from 'react';
import ReactDOM from 'react-dom/client';

import './assets/css/index.css';
import Header from './Header';
import Footer from './Footer';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
    <App />
    <Footer />
  </React.StrictMode>
);

// function App() {
//   return (
//     <div>
//       <Header />
//       <Content />
//       <Footer />
//     </div>
//     )
//   }
//   ReactDOM.render(<App />, document.getElementById("root"));