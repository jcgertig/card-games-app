import NextDocument, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import { Children } from 'react';
import { AppRegistry } from 'react-native';

import Tamagui from '../tamagui.config';

export default class Document extends NextDocument {
  static async getInitialProps({ renderPage }: DocumentContext) {
    AppRegistry.registerComponent('Main', () => Main);
    const page = await renderPage();

    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const { getStyleElement } = AppRegistry.getApplication('Main');

    /**
     * Note: be sure to keep tamagui styles after react-native-web styles like it is here!
     * So Tamagui styles can override the react-native-web styles.
     */
    const styles = [
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      getStyleElement(),
      <style
        key="tamagui-css"
        dangerouslySetInnerHTML={{ __html: Tamagui.getCSS() }}
      />,
    ];

    return { ...page, styles: Children.toArray(styles) };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
