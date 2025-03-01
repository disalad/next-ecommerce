'use client';
import { logOutUser, deleteAccount } from '@/lib/auth/authAction';
import { useAlertBox } from '@/context/AlertBoxContext';
import { useSession } from 'next-auth/react';
import { handleAuthResult } from '@/utils/sessionUtils';
import { useCart } from '@/context/CartContext';

export default function AccountActions() {
    const { data: session, update } = useSession();
    const { showAlert } = useAlertBox();
    const { setCart } = useCart();

    const handleLogout = async (ev) => {
        ev.preventDefault();
        try {
            const result = await logOutUser();
            await update();
            await setCart({});
            handleAuthResult(result, 'logout');
            showAlert('Logged out successfully', 'success');
        } catch (error) {
            showAlert('Failed to log out', 'error');
        }
    };

    const handleDelete = async (ev) => {
        if (confirm('Are you sure you want to delete your account?')) {
            try {
                const result = await deleteAccount();
                await update();
                await setCart({});
                handleAuthResult(result, 'deleteAccount');
                showAlert('Account deleted successfully', 'success');
            } catch (error) {
                showAlert('Failed to delete account', 'error');
            }
        }
    };

    return (
        <div
            className='flex items-center justify-center'
            style={{ height: 'calc(100vh - 95px)' }}
        >
            <div className='flex flex-col gap-4 w-64'>
                <button
                    onClick={handleLogout}
                    className='w-full py-2 border-2 border-blue-500 text-blue-500 rounded-md font-medium bg-white hover:bg-blue-50 transition'
                >
                    Log Out
                </button>

                <button
                    onClick={handleDelete}
                    className='w-full py-2 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 transition'
                >
                    Delete Account
                </button>
            </div>
        </div>
    );
}
