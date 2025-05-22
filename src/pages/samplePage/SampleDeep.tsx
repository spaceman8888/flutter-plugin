import ButtonSample from '@/components/base/button/ButtonSample';
import { useNavigate } from 'react-router-dom';

export default function SampleDeep() {
  const navigate = useNavigate();
  const handleClick = () => {
    console.log('Click');
    navigate(-1);
  };
  return (
    <div className="bg-gray-200 p-2">
      <h1>SampleDeep</h1>
      <ButtonSample onClick={handleClick} variant="primary" label="뒤로가기" />
    </div>
  );
}
