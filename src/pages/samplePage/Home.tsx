import ButtonSample from '@/components/base/button/ButtonSample';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-4 rounded-md m-2">
      <h1>Home</h1>
      <div className="flex flex-col">
        <ButtonSample
          label="Sample 페이지 이동"
          variant="primary"
          className="m-2"
          onClick={() => navigate('/sample')}
        />
        <ButtonSample
          label="Login 페이지 이동"
          variant="primary"
          className="m-2"
          onClick={() => navigate('/login')}
        />
        <ButtonSample
          label="SampleDeep 페이지 이동"
          variant="primary"
          className="m-2"
          onClick={() => navigate('/sample/deep')}
        />
      </div>
    </div>
  );
}
