import { styled, Skeleton, SkeletonProps } from '@mui/material';

const LoadingSkeleton = styled(Skeleton)(() => ({
  width: '100%',
}));

const Loading = (props: SkeletonProps) => {
  return <LoadingSkeleton {...props} variant="rectangular" />;
};

export default Loading;
