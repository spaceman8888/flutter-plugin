import { useQueryComments } from '@/apis/samples/queries/use-query-comments';
import { IComment } from '@/apis/samples/schema/sample-schema';
import { useSampleStore } from '@/stores/sample-store';
import ButtonSample from '@/components/base/button/ButtonSample';
import LabelSample from '@/components/base/label/LabelSample';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BottomSheet from '@/components/base/bottom-sheet/BottomSheet';

export default function Sample() {
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();
  const { data = [] } = useQueryComments(1) as { data: IComment[] };

  const { count, increment, decrement, reset } = useSampleStore();

  const changeLanguage = (lng: 'en' | 'ko') => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="bg-gray-200 p-2">
      <h1 className="text-2xl font-bold">Sample Page</h1>
      <div className="bg-white p-4 rounded-md m-2">
        <h2 className="text-lg font-bold">API TEST(axios, tanstack query)</h2>
        {data?.map((comment: IComment) => (
          <div key={comment.id}>
            <h2>{comment.name}</h2>
            <p className="text-gray-700 text-xs">{comment.body}</p>
          </div>
        ))}
      </div>
      <div className="bg-white p-4 rounded-md m-2">
        <h2 className="text-lg font-bold">Store TEST(zustand)</h2>
        <LabelSample>{count}</LabelSample>

        <ButtonSample
          label="Increment"
          variant="primary"
          className="m-2"
          onClick={() => increment()}
        />
        <ButtonSample
          label="Decrement"
          variant="secondary"
          className="m-2"
          onClick={() => decrement()}
        />
        <ButtonSample label="Reset" variant="secondary" className="m-2" onClick={() => reset()} />
      </div>
      <div className="bg-white p-4 rounded-md m-2">
        <h2 className="text-lg font-bold">다국어 처리(react-i18next)</h2>
        {t('welcome')}
        <br />
        {t('description')}
        <br />
        <ButtonSample
          label="영어"
          variant="primary"
          className="m-2"
          onClick={() => {
            changeLanguage('en');
          }}
        />
        <ButtonSample
          label="한국어"
          variant="primary"
          className="m-2"
          onClick={() => {
            changeLanguage('ko');
          }}
        />
      </div>
      <div className="bg-white p-4 rounded-md m-2">
        <h2 className="text-lg font-bold">라우팅 TEST</h2>

        <ButtonSample
          label="SampleDeep"
          variant="primary"
          className="m-2"
          onClick={() => navigate('/sample/deep')}
        />
      </div>
      <div className="bg-white p-4 rounded-md m-2">
        <h2 className="text-lg font-bold">BottomSheet TEST</h2>
        <BottomSheet />
      </div>
    </div>
  );
}
