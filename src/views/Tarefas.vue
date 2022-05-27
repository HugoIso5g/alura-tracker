
<template>
    <Formulario @aoSalvarTarefa="salvarTarefa"/>
    <div class="lista">
        <div class="field">
          <p class="control has-icons-left">
            <input class="input" type="text" placeholder="Digite para filtrar" v-model="filtro">
            <span class="icon is-small is-left">
              <i class="fas fa-search"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
          </p>
        </div>

        <Tarefa v-for="(tarefa,index) in tarefas" :key="index"  :tarefa="tarefa" @aoTarefaClicada="selecionarTarefa"/>
        <Box v-if="listaEstaVazia">
          Você não está muito produtivo hoje :(
        </Box>

        <Modal :mostrar="tarefaSelecionada != null">
              <template v-slot:cabecalho>
                <p class="modal-card-title">Editando uma Tarefa</p>
                <button class="delete" aria-label="close" @click="fecharModal"></button>
              </template>

              <template v-slot:corpo>
                <div class="field">
                    <label for="descricaoDaTarefa" class="label"> Descrição </label>
                    <input
                        type="text"
                        class="input"
                        v-model="tarefaSelecionada.descricao"
                        id="descricaoDaTarefa"
                    />
                </div>
              </template>

              <template v-slot:rodape>
                <button class="button is-success" @click="alterarTarefa">Salvar alterções</button>
                <button class="button" @click="fecharModal">Cancelar</button>
              </template>
        </Modal>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from 'vue';

import Formulario from '../components/Formulario.vue';
import Tarefa from '../components/Tarefa.vue';
import ITarefa from '../interfaces/ITarefa';
import Box from '../components/Box.vue';
import Modal from '@/components/Modal.vue';
import { ALTERAR_TAREFA, CADASTRAR_TAREFAS, OBTER_PROJETOS, OBTER_TAREFAS } from '@/store/tipo-acoes';
import { useStore } from '@/store';

export default defineComponent({
  name: 'App',
  components: {
    Formulario,
    Tarefa,
    Box,
    Modal
  },
  data() {
    return {
      tarefaSelecionada: null as ITarefa | null
    }
  },
  methods : {
    salvarTarefa(tarefa: ITarefa) {
     this.store.dispatch(CADASTRAR_TAREFAS,tarefa);
    },
    alterarTarefa(){
      this.store
      .dispatch(ALTERAR_TAREFA,this.tarefaSelecionada)
      .then(() => this.fecharModal());
    },
    selecionarTarefa(tarefa: ITarefa){
      this.tarefaSelecionada = tarefa;
    },
    fecharModal(){
      this.tarefaSelecionada = null;
    }
  },
  computed: {
    listaEstaVazia() : boolean{
      return this.tarefas.length === 0;
    }
  },
  setup() {
        const store = useStore();
        store.dispatch(OBTER_TAREFAS);
        store.dispatch(OBTER_PROJETOS);

        const filtro = ref("");

        watchEffect(() => {
          store.dispatch(OBTER_TAREFAS,filtro.value);
        })
      

        return {
            tarefas : computed(() => store.state.tarefas),
            store,
            filtro
        }
    }
});

</script>


