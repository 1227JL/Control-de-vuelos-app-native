import LoadingModal from "../components/LoadingModal";
import useAuth from "../hooks/useAuth";
 
export default function AuthLayout({children}) {
  const { cargando, alerta } =  useAuth()
  if(cargando) return <LoadingModal isVisible={cargando} alerta={alerta} />
  
  return (
    <>
      {children}
    </>
  );
}
