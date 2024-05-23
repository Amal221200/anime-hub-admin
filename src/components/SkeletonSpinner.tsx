import React, { ComponentProps } from 'react'
import Spinner from './spinner'
import { cn } from '@/lib/utils'

const SkeletonSpinner = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div className={cn('flex h-[80vh] items-center justify-center', className)} {...props}>
      <Spinner />
    </div>
  )
}

export default SkeletonSpinner