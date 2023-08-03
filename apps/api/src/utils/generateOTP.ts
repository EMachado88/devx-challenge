export default (): string => {
  // Generate a 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  // Log it per requirement
  console.log('OTP:', otp);
  return otp;
};
