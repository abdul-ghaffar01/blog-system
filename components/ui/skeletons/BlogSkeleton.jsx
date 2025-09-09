import SkeletonBox from './SkeletonBox'

const BlogSkeleton = () => {
    return (
        <div className="container mx-auto px-4 py-12 grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <SkeletonBox className="h-10 w-3/4 mb-6" />
                <SkeletonBox className="h-64 w-full mb-6 rounded-xl" />
                <SkeletonBox className="h-6 w-1/3 mb-4" />
                <SkeletonBox className="h-40 w-full" />
            </div>
            <div className="hidden lg:block">
                <SkeletonBox className="h-40 w-full mb-6" />
                <SkeletonBox className="h-64 w-full" />
            </div>
        </div>
    )
}

export default BlogSkeleton