<template>
  <div class="page-content">
    <top-bar :title="$t('terms_of_service')" />

    <template v-if="$i18n.locale !== 'pt'">
      <span
        >By using the <span class="logo">GBreath</span> app, you agree to the
        following terms of service:</span
      >

      <h3 class="page-subtitle">Use of the App:</h3>
      <span
        >You may use <span class="logo">GBreath</span> for personal and legal
        purposes, including commercial purposes. However, you must comply with
        all applicable laws and regulations.</span
      >

      <h3 class="page-subtitle">Intellectual Property:</h3>
      <span
        ><span class="logo">GBreath</span> is open-source and has no copyright.
        This means that you can use and modify the
        <span class="logo">GBreath</span> code according to the relevant license
        terms.</span
      >

      <h3 class="page-subtitle">Modification of the App:</h3>
      <span
        >You may modify the <span class="logo">GBreath</span> code according to
        the relevant license. However, you are responsible for any issues
        arising from your modifications.</span
      >

      <h3 class="page-subtitle">Warranty:</h3>
      <span
        ><span class="logo">GBreath</span> is provided "as is" without
        warranties of any kind, express or implied. In no event shall
        <span class="logo">GBreath</span> be liable for any damages, including
        direct, indirect, special, consequential, or exemplary damages, arising
        from the use of the app.</span
      >

      <h3 class="page-subtitle">Changes to the Terms of Service:</h3>
      <span
        ><span class="logo">GBreath</span> reserves the right to change these
        terms of service at any time. Changes will be posted on this page.</span
      >

      <h3 class="page-subtitle">Contact:</h3>
      <span
        >If you have any questions about these terms of service, please contact
        us at
        <a
          href="mailto:support@patogordo.dev"
          target="_blank"
          class="link link-info"
          rel="noopener noreferrer"
          >support@patogordo.dev</a
        >.</span
      >

      <span>Last updated: February 9th, 2023</span>

      <br />
      <br />
    </template>

    <template v-if="$i18n.locale === 'pt'">
      <span
        >Ao usar o aplicativo <span class="logo">GBreath</span>, você concorda
        com os seguintes termos de serviço:
      </span>

      <h3 class="page-subtitle">Uso do Aplicativo:</h3>
      <span
        >Você pode usar o <span class="logo">GBreath</span> para fins pessoais e
        legais, incluindo fins comerciais. No entanto, você deve cumprir todas
        as leis e regulamentos aplicáveis.
      </span>

      <h3 class="page-subtitle">Propriedade Intelectual:</h3>
      <span
        >O <span class="logo">GBreath</span> é de código aberto e não possui
        direitos autorais ou propriedade intelectual. Isso significa que você
        pode usar e modificar o código do <span class="logo">GBreath</span> de
        acordo com os termos da licença relevante.</span
      >

      <h3 class="page-subtitle">Modificação do Aplicativo:</h3>
      <span
        >Você pode modificar o código do <span class="logo">GBreath</span> de
        acordo com a licença relevante. No entanto, você é responsável por
        quaisquer problemas resultantes de suas modificações.
      </span>

      <h3 class="page-subtitle">Warranty:</h3>
      <span
        ><span class="logo">GBreath</span> i é fornecido "no estado em que se
        encontra" sem garantias de qualquer tipo, expressas ou implícitas. Em
        nenhuma hipótese, a <span class="logo">GBreath</span> será responsável
        por quaisquer danos, incluindo danos diretos, indiretos, especiais,
        consequenciais ou exemplares, decorrentes do uso do aplicativo.</span
      >

      <h3 class="page-subtitle">Alterações nos Termos de Serviço:</h3>
      <span
        >A <span class="logo">GBreath</span> se reserva o direito de alterar
        estes termos de serviço a qualquer momento. As alterações serão
        publicadas nesta página.
      </span>

      <h3 class="page-subtitle">Contato:</h3>
      <span
        >Se você tiver alguma dúvida sobre estes termos de serviço, entre em
        contato conosco em
        <a
          href="mailto:support@patogordo.dev"
          target="_blank"
          class="link link-info"
          rel="noopener noreferrer"
          >support@patogordo.dev</a
        >.</span
      >

      <span>Última atualização: 09 de fevereiro de 2023</span>

      <br />
      <br />
    </template>
  </div>
</template>
