interface ContentProps {
  setContent: (_: string) => void;
}

export const OptionsMenu = ({ setContent }: ContentProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <button onClick={() => setContent("privateKey")}>
          View Private Key
        </button>
        <button onClick={() => setContent("recovery")}>
          View Recovery Phrase
        </button>
        <button onClick={() => setContent("remove")}>Remove Wallet</button>
      </div>
    </div>
  );
};

export const PrivateKey = ({ setContent }: ContentProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 pb-6 border-b-[1px] border-neutral-100">
        <h1 className="font-medium text-xl">Private Key</h1>
        <p className="text-neutral-500">
          Your Private Key is the key used to back up your wallet. Keep it
          secret and secure at all times.
        </p>
      </div>
      <div>
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex items-center gap-4 text-neutral-500 text-sm">
            <p className="font-medium">Keep your private key safe</p>
          </div>
          <div className="flex items-center gap-4 text-neutral-500 text-sm">
            <p className="font-medium">Dont share it with anyone else</p>
          </div>
          <div className="flex items-center gap-4 text-neutral-500 text-sm">
            <p className="font-medium">If you lose it, we cant recover it</p>
          </div>
        </div>
        <div className="flex gap-4 w-full">
          <button onClick={() => setContent("options")}>Cancel</button>
          <button onClick={() => setContent("options")}>Reveal</button>
        </div>
      </div>
    </div>
  );
};

export const RecoveryPhrase = ({ setContent }: ContentProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 pb-6 border-b-[1px] border-neutral-100">
        <h1 className="font-medium text-xl">Secret Recovery Phrase</h1>
        <p className="text-neutral-500">
          Your Secrete Recovery Phrase is used to gain access to your wallet in
          case you lose your key. Keep it secret and secure at all times.
        </p>
      </div>
      <div>
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex items-center gap-4 text-neutral-500 text-sm">
            <p className="font-medium">Keep your Secret Phrase safe</p>
          </div>
          <div className="flex items-center gap-4 text-neutral-500 text-sm">
            <p className="font-medium">Dont share it with anyone else</p>
          </div>
          <div className="flex items-center gap-4 text-neutral-500 text-sm">
            <p className="font-medium">If you lose it, we cant recover it</p>
          </div>
        </div>
        <div className="flex gap-4 w-full">
          <button onClick={() => setContent("options")}>Cancel</button>
          <button onClick={() => setContent("options")}>Reveal</button>
        </div>
      </div>
    </div>
  );
};

export const RemoveWallet = ({ setContent }: ContentProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <h1 className="font-medium text-xl">Are you sure?</h1>
        <p className="text-neutral-500">
          You havent backed up your wallet yet. If you remove it, you could lose
          access forever. We suggest tapping and backing up your wallet first
          with a valid recovery method.
        </p>
      </div>
      <div>
        <div className="flex gap-4 w-full">
          <button onClick={() => setContent("options")}>Cancel</button>
          <button onClick={() => setContent("options")}>Continue</button>
        </div>
      </div>
    </div>
  );
};
