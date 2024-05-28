'use client'
import useAlertModal from '@/hooks/useAlertModal'
import { Button } from '../ui/button'
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog'

const AlertModal = () => {
    const { open, onClose, title, description } = useAlertModal()

    return (
        <AlertDialog open={!open}>
            <AlertDialogContent className='border-zinc-800 bg-[rgb(5,0,0)]'>
                <AlertDialogHeader>
                    <AlertDialogTitle className='text-red-600'>{title}</AlertDialogTitle>
                    <AlertDialogDescription className='text-red-600'>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <Button type="button" size="sm" onClick={onClose} variant={'outline-destructive'}>
                        I understand
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default AlertModal