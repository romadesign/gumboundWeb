import style from '@/styles/servers/servers.module.css'


interface serverProps {
    name: React.ReactNode;
    level: string
    // img: React.ReactNode;
}

const server: React.FC<serverProps> = ({ name , level}) => {
    return (
      <div className={style.server}>
        <div>{name}</div>
        <div>{level}</div>
      </div>
  )
}

export default server;