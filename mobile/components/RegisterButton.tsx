import { Button } from 'react-native';
import useLotteries from '../hooks/useLotteries';

export default function RegisterButton({ visible }: { visible: boolean }) {
  if (!visible) return null;

  const { fetchLotteries } = useLotteries();

  function handlePress() {
    //open modal
  }

  function handleRegister() {
    fetchLotteries();
  }

  return <Button title="Register" />;
}
