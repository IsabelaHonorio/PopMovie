import 'react-native-url-polyfill/auto';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ymogirjozvdkljpocegc.supabase.co';
const supabaseKey = 'sb_publishable_QmDlbaxB1IHhniTEtKUaXA_6oWiAOMt';

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);

export async function salvarFuncionalidadesFilme(idFilme, funcionalidades) {
  const id = Number(idFilme);

  if (!Number.isInteger(id)) {
    throw new Error('ID do filme inválido.');
  }

  const { data: dadosUsuario, error: erroUsuario } =
    await supabase.auth.getUser();

  if (erroUsuario || !dadosUsuario?.user) {
    return;
  }

  const usuario = dadosUsuario.user;

  const { error: erroFilme } = await supabase
    .from('filmes')
    .upsert(
      { id_filmes: id },
      { onConflict: 'id_filmes', ignoreDuplicates: true }
    );

  if (erroFilme) {
    throw erroFilme;
  }

  const { error: erroCadastroUsuario } = await supabase
    .from('usuario')
    .upsert(
      {
        id_usuario: usuario.id,
        apelido:
          usuario.user_metadata?.apelido ||
          usuario.user_metadata?.nomeUsuario ||
          null,
      },
      { onConflict: 'id_usuario' }
    );

  if (erroCadastroUsuario) {
    throw erroCadastroUsuario;
  }

  const atualizacao = {
    fk_filmes_id_filmes: id,
    fk_usuario_id_usuario: usuario.id,
  };

  if (funcionalidades.avaliacao !== undefined) {
    atualizacao.avaliacao = funcionalidades.avaliacao;
  }

  if (funcionalidades.bloqueado !== undefined) {
    atualizacao.bloqueado = funcionalidades.bloqueado;
  }

  if (funcionalidades.lista !== undefined) {
    atualizacao.lista = funcionalidades.lista;
  }

  if (funcionalidades.favoritos !== undefined) {
    atualizacao.favoritos = funcionalidades.favoritos;
  }

  const { error: erroFuncionalidade } = await supabase
    .from('funcionalidades')
    .upsert(atualizacao, {
      onConflict: 'fk_filmes_id_filmes,fk_usuario_id_usuario',
    });

  if (erroFuncionalidade) {
    throw erroFuncionalidade;
  }
}

export async function salvarFilmeSorteado(idFilme) {
  await salvarFuncionalidadesFilme(idFilme, {});
}

export async function buscarFilmesPorFuncionalidade(campo) {
  const camposPermitidos = ['avaliacao', 'bloqueado', 'lista', 'favoritos'];

  if (!camposPermitidos.includes(campo)) {
    throw new Error('Funcionalidade inválida.');
  }

  const { data: dadosUsuario, error: erroUsuario } =
    await supabase.auth.getUser();

  if (erroUsuario) {
    throw erroUsuario;
  }

  if (!dadosUsuario?.user) {
    return [];
  }

  let consulta = supabase
    .from('funcionalidades')
    .select(`fk_filmes_id_filmes, ${campo}`)
    .eq('fk_usuario_id_usuario', dadosUsuario.user.id);

  if (campo === 'avaliacao') {
    consulta = consulta.not('avaliacao', 'is', null).neq('avaliacao', 0);
  } else {
    consulta = consulta.eq(campo, true);
  }

  const { data: registros, error } = await consulta;

  if (error) {
    throw error;
  }

  const API_KEY = '0d335050c2cc3308096c03300829a424';

  const filmes = await Promise.all(
    (registros || []).map(async (registro) => {
      const id = registro.fk_filmes_id_filmes;

      try {
        const resposta = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=pt-BR`
        );

        if (!resposta.ok) {
          return null;
        }

        const detalhes = await resposta.json();

        if (campo === 'avaliacao') {
          detalhes.userRating = Number(registro.avaliacao) || 0;
        }

        return detalhes;
      } catch (erro) {
        console.error(`Erro ao carregar o filme ${id}:`, erro);
        return null;
      }
    })
  );

  return filmes.filter(Boolean);
}