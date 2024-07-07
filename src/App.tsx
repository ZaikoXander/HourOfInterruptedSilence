import { useEffect } from 'react'

import PlayerControl from './components/PlayerControl'

import { useTranslation } from 'react-i18next'

import cn from './lib/cn'

import { FaGithub } from 'react-icons/fa'

export default function App() {
  const { t, i18n } = useTranslation('', { keyPrefix: 'app' })

  useEffect(() => {
    document.title = t('pageTitle')
    document.documentElement.lang = i18n.language
  }, [t, i18n.language])

  return (
    <main
      className={cn(
        'flex h-screen flex-col items-center justify-center gap-40',
        'bg-[#FFD700] pb-32',
      )}
    >
      <h1
        className={cn(
          'font-[Baloo] text-6xl font-bold text-[#333333] shadow-black',
          'drop-shadow',
        )}
      >
        {t('title')}
      </h1>
      <PlayerControl />
      <a
        className='absolute right-5 top-4'
        target='_blank'
        rel='noopener noreferrer'
        href='https://github.com/ZaikoXander/HoraDeSilencioInterrompido'
      >
        <FaGithub size={40} />
      </a>
    </main>
  )
}
