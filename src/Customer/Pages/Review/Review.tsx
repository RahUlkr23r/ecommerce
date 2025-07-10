
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../State/Store';
import ReviewCard from './ReviewCard';

const Review = () => {
  const { productId } = useParams<{ productId: string }>();
  const { user } = useAppSelector((state) => state.auth); // Assuming you have auth state in your store

  if (!productId) {
    return <div>Product ID is missing</div>;
  }

  return (
    <div className="w-full">
      <ReviewCard 
        productId={Number(productId)} 
        currentUserId={user?.id} 
      />
    </div>
  );
};

export default Review; 