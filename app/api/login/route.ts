const cookie = require('cookie');

export const POST = async (req: Request) => {
    
    if (req.method == "POST"){
        const { username, password } = await req.json();
        
        try {
            if (username == process.env.LOGINUSERNAME && password == process.env.LOGINPASSWORD){

                const token = 'THERE-IS-NO-AUTH-TOKEN-HAHA';

                return new Response(JSON.stringify({'message':'خوش آمدید'}), 
                {status: 200, 
                    headers: {
                        'Set-Cookie': cookie.serialize('auth_token', token, {
                            httpOnly: false, // set to true Prevent access by JavaScript but also client side can't access it
                            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
                            sameSite: 'strict', // CSRF protection
                            maxAge: 60 * 60 * 24 , // 1 day expiry
                            path: '/', // Cookie is valid across the entire domain
                        }),
                        'Content-Type': 'application/json',
                    },
                })
            } else {
                return new Response(JSON.stringify({'message':'کاربر پیدا نشد'}), {status: 400})
            }
            
        } catch (error) {
            console.log("there is an error: ",error)
            return new Response(JSON.stringify({'message':'خطایی رخ داد لطفا مجدد تلاش کنید'}), {status: 500})
        }
    }
}
