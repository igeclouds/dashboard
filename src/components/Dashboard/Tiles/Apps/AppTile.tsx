import { Center, Text, UnstyledButton } from '@mantine/core';
import { NextLink } from '@mantine/next';
import { createStyles } from '@mantine/styles';
import { motion } from 'framer-motion';
import { AppType } from '../../../../types/app';
import { useCardStyles } from '../../../layout/useCardStyles';
import { useEditModeStore } from '../../Views/useEditModeStore';
import { HomarrCardWrapper } from '../HomarrCardWrapper';
import { BaseTileProps } from '../type';
import { AppMenu } from './AppMenu';
import { AppPing } from './AppPing';

interface AppTileProps extends BaseTileProps {
  app: AppType;
}

export const AppTile = ({ className, app }: AppTileProps) => {
  const isEditMode = useEditModeStore((x) => x.enabled);

  const { cx, classes } = useStyles();

  const {
    classes: { card: cardClass },
  } = useCardStyles(false);

  function Inner() {
    return (
      <>
        <Text align="center" weight={500} size="md" className={classes.appName}>
          {app.name}
        </Text>
        <Center style={{ height: '85%', flex: 1, width: '85%' }}>
          <motion.img
            className={classes.image}
            src={app.appearance.iconUrl}
            alt={app.name}
            whileHover={{
              scale: 1.2,
              transition: { duration: 0.2 },
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </Center>
      </>
    );
  }

  return (
    <HomarrCardWrapper className={className}>
      <AppMenu app={app} />
      {!app.url || isEditMode ? (
        <UnstyledButton
          className={classes.button}
          style={{ pointerEvents: isEditMode ? 'none' : 'auto' }}
        >
          <Inner />
        </UnstyledButton>
      ) : (
        <UnstyledButton
          style={{ pointerEvents: isEditMode ? 'none' : 'auto' }}
          component={NextLink}
          href={app.behaviour.externalUrl.length > 0 ? app.behaviour.externalUrl : app.url}
          target={app.behaviour.isOpeningNewTab ? '_blank' : '_self'}
          className={cx(classes.button)}
        >
          <Inner />
        </UnstyledButton>
      )}
      <AppPing app={app} />
    </HomarrCardWrapper>
  );
};

const useStyles = createStyles((theme, _params, getRef) => ({
  image: {
    ref: getRef('image'),
    maxHeight: '90%',
    maxWidth: '90%',
  },
  appName: {
    ref: getRef('appName'),
  },
  button: {
    paddingBottom: 10,
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
  },
}));

export const appTileDefinition = {
  component: AppTile,
  minWidth: 1,
  minHeight: 1,
  maxWidth: 12,
  maxHeight: 12,
};
