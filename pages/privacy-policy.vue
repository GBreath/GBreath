<template>
  <div class="page-content">
    <top-bar :title="$t('privacy_policy')" />

    <template v-if="$i18n.locale !== 'pt'">
      <span>
        We, at
        <span class="logo">GBreath</span>, value the privacy of our users and
        are committed to protecting the information collected during the use of
        our breathing guide app. This privacy policy explains what information
        we collect and how we use it.
      </span>

      <h3 class="page-subtitle">Collected information:</h3>

      <ul class="list-disc ml-4">
        <li>User email</li>
        <li>User name</li>
        <li>User photo URL</li>
      </ul>

      <p>
        This information is collected only for the purpose of user
        authentication and will not be used for any other purpose. We do not
        collect sensitive or confidential information from users.
      </p>

      <h3 class="page-subtitle">Use of collected information:</h3>
      <span>
        The collected information is used only for internal
        <span class="logo">GBreath</span>
        purposes, such as:
      </span>

      <ul class="list-disc ml-4">
        <li>User authentication</li>
        <li>Providing user support</li>
        <li>Improving the quality of the app</li>
      </ul>

      <h3 class="page-subtitle">Sharing of information:</h3>

      <span>
        We do not share the collected information with third parties, except in
        cases where required by law or when we consider it necessary to protect
        the rights and security of our users and
        <span class="logo">GBreath</span>.
      </span>

      <h3 class="page-subtitle">Information security:</h3>
      <p>
        We take rigorous security measures to protect the collected information
        against unauthorized access, misuse, alteration or destruction. However,
        we cannot guarantee the absolute security of information transmitted
        through the internet.
      </p>

      <h3 class="page-subtitle">Changes to privacy policy:</h3>
      <p>
        We reserve the right to change this privacy policy at any time. Any
        changes will be posted on this page.
      </p>

      <h3>Contact:</h3>
      <p>
        If you have any questions about this privacy policy, please contact us
        at
        <a
          href="mail:support@patogordo.dev"
          target="_blank"
          class="link link-info"
          rel="noopener noreferrer"
          >support@patogordo.dev</a
        >.
      </p>

      <p>Last updated: February 9th, 2023</p>
      <br />
      <br />
    </template>

    <template v-if="$i18n.locale === 'pt'">
      <span>
        Nós, da
        <span class="logo">GBreath</span>, valorizamos a privacidade dos nossos
        usuários e comprometemo-nos a proteger as informações coletadas durante
        o uso do nosso aplicativo de guia de respiração. Esta política de
        privacidade explica quais informações coletamos e como as usamos.
      </span>

      <h3 class="page-subtitle">Informações coletadas:</h3>

      <ul class="list-disc ml-4">
        <li>E-mail do usuário</li>
        <li>Nome do usuário</li>
        <li>URL da foto do usuário</li>
      </ul>

      <p>
        Essas informações são coletadas apenas para fins de autenticação do
        usuário e não serão usadas para outros propósitos. Não coletamos
        informações sensíveis ou confidenciais dos usuários.
      </p>

      <h3 class="page-subtitle">Uso das informações coletadas:</h3>
      <span>
        As informações coletadas são usadas apenas para fins internos da
        <span class="logo">GBreath</span>, tais como:
      </span>

      <ul class="list-disc ml-4">
        <li>Autenticação do usuário</li>
        <li>Fornecer suporte ao usuário</li>
        <li>Melhorar a qualidade do aplicativo</li>
      </ul>

      <h3 class="page-subtitle">Compartilhamento de informações:</h3>

      <span>
        Não compartilhamos as informações coletadas com terceiros, exceto em
        casos em que seja exigido por lei ou quando considerarmos necessário
        para proteger os direitos e segurança de nossos usuários e do
        <span class="logo">GBreath</span>.
      </span>

      <h3 class="page-subtitle">Segurança das informações:</h3>
      <p>
        Tomamos medidas de segurança rigorosas para proteger as informações
        coletadas contra acesso não autorizado, uso indevido, alteração ou
        destruição. No entanto, não podemos garantir a segurança absoluta das
        informações transmitidas através da internet.
      </p>

      <h3 class="page-subtitle">Alterações na política de privacidade:</h3>
      <p>
        Reservamo-nos o direito de alterar esta política de privacidade a
        qualquer momento. Qualquer alteração será publicada nesta página.
      </p>

      <h3>Contato:</h3>
      <p>
        Se tiver alguma dúvida sobre esta política de privacidade, entre em
        contato conosco através do e-mail
        <a
          href="mail:support@patogordo.dev"
          target="_blank"
          class="link link-info"
          rel="noopener noreferrer"
          >support@patogordo.dev</a
        >.
      </p>

      <p>Data de última atualização: 09 de fevereiro de 2023</p>
      <br />
      <br />
    </template>
  </div>
</template>
