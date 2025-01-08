import { Routes, Route } from 'react-router-dom';
import List from './Components/List';
import AddProduct from './Components/AddProduct';
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<List />} />
        <Route path='/addproduct' element={<AddProduct />} />
      </Routes>
    </>
  );
}

export default App;
