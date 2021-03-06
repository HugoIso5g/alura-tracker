import { projeto } from './modulos/projeto/index';
import {
  OBTER_TAREFAS,
  CADASTRAR_TAREFAS,
  ALTERAR_TAREFA
} from "./tipo-acoes";
import { INotificacao } from "./../interfaces/INotificacao";
import {
  NOTIFICAR,
  DEFINIR_TAREFAS,
  ADICIONAR_TAREFA,
  ALTERA_TAREFA,
} from "./tipo-mutacoes";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import http from "@/http";
import ITarefa from "@/interfaces/ITarefa";
import { EstadoProjeto } from "./modulos/projeto";

export interface Estado {
  tarefas: ITarefa[];
  notificacoes: INotificacao[];
  projeto: EstadoProjeto
}
export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
  state: {
    tarefas: [],
    notificacoes: [],
    projeto: {
      projetos:[]
    }
  },
  mutations: {

    [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
      state.tarefas = tarefas;
    },
    [ADICIONAR_TAREFA](state, tarefa: ITarefa) {
      state.tarefas.push(tarefa);
    },
    [ALTERA_TAREFA](state, tarefa: ITarefa) {
      const index = state.tarefas.findIndex((tar) => tar.id == tarefa.id);
      state.tarefas[index] = tarefa;
    },
    [NOTIFICAR](state, novaNotificacao: INotificacao) {
      novaNotificacao.id = new Date().getTime();
      state.notificacoes.push(novaNotificacao);
      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter(
          (notificacao) => notificacao.id != novaNotificacao.id
        );
      }, 3000);
    },
  },
  actions: {

    /** TAREFAS ---------------------------------------------> */
    [OBTER_TAREFAS]({ commit },filtro: string) {

      let url = 'tarefas';

      if(filtro){
        url += '?descricao=' + filtro;
      }

      http
        .get(url)
        .then((resposta) => commit(DEFINIR_TAREFAS, resposta.data));
    },
    [CADASTRAR_TAREFAS]({ commit }, tarefa: ITarefa) {
      return http
        .post("/tarefas", tarefa)
        .then((resposta) => commit(ADICIONAR_TAREFA, resposta.data));
    },
    [ALTERAR_TAREFA]({commit}, tarefa: ITarefa) {
      return http.put(`/tarefas/${tarefa.id}`, tarefa)
      .then(() => commit(ALTERA_TAREFA, tarefa));
    },
  },
  modules:{
    projeto
  }
});

export function useStore(): Store<Estado> {
  return vuexUseStore(key);
}
