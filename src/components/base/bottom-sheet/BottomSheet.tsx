import { Dialog } from 'radix-ui';
import { cn } from '@/lib/utils/cn'; // tailwind 클래스 조합 함수 (선택사항)

export default function BottomSheet() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="px-4 py-2 bg-blue-600 text-white rounded">열기</button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-40" />
        <Dialog.Content
          className={cn(
            'fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl',
            'w-full max-h-[80vh] p-4 shadow-xl transition-all animate-in slide-in-from-bottom'
          )}
        >
          <div className="flex items-center justify-between mb-2">
            <Dialog.Title className="text-lg font-bold">설정</Dialog.Title>
            <Dialog.Close asChild>
              <button>X</button>
            </Dialog.Close>
          </div>

          <div className="text-sm text-gray-600 min-h-10">
            여기 안에 내용을 넣으면 됩니다. 설정, 공유, 필터 등.
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
