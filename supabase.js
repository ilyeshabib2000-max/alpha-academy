import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://srdkrxulmcgelmqqtpij.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNyZGtyeHVsbWNnZWxtcXF0cGlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg5NTY5NzcsImV4cCI6MjEwNDUzMjk3N30.fe7Tv3B7bcM_H28Q9hqGuvxjfdK24y9GKrGAclKnEqI';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * دالة تفحص ما إذا كان المستخدم الحالي مشتركاً (is_pro = true) أم لا
 * @returns {Promise<boolean>} ترجع true إذا كان مشتركاً و false إذا كان مجانياً
 */
export async function checkIsProUser() {
    try {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) return false;

        const { data, error } = await supabase
            .from('profiles')
            .select('is_pro')
            .eq('id', user.id)
            .maybeSingle();

        if (error) {
            console.error("خطأ أثناء جلب بيانات المستخدم من Supabase:", error);
            return false;
        }

        return data?.is_pro === true;
    } catch (err) {
        console.error("خطأ عام في فحص الاتصال:", err);
        return false;
    }
}