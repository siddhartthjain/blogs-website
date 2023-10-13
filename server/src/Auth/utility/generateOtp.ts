export default function generateOTP(length: number) {
    const characters = '0123456789';
    let OTP = '';
    for (let i = 0; i < length; i++) {
        const index = Math.floor(Math.random() * characters.length);
        OTP += characters[index];
    }
    return OTP;
}
