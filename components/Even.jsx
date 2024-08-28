import { useEffect } from "react";

const Even = () => {
  useEffect(() => {
    return () => {
      console.log("Even 언마운트");
    };
  }, []);

  return <div>현재 카운트는 짝수입니다.</div>;
};
export default Even;
