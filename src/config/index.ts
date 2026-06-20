type Config = {
  envs: {
    environment: 'development' | 'production' | 'test'
  }
}

const config: Config = {
  envs: {
    environment: import.meta.env.MODE as Config['envs']['environment'],
  },
}

export { config }
export type { Config }
