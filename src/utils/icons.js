import {
  BeakerIcon,
  BookOpenIcon,
  BriefcaseIcon,
  BuildingOfficeIcon,
  ChartBarIcon,
  CodeBracketIcon,
  CogIcon,
  CommandLineIcon,
  ComputerDesktopIcon,
  CubeIcon,
  DocumentIcon,
  FolderIcon,
  GlobeAltIcon,
  LightBulbIcon,
  PuzzlePieceIcon,
  RocketLaunchIcon,
  SparklesIcon,
  StarIcon,
  SwatchIcon,
  WrenchIcon,
  ClipboardDocumentListIcon,
  AdjustmentsHorizontalIcon,
  CircleStackIcon,
  CloudIcon
} from '@heroicons/react/24/outline';

export const projectIcons = [
  { icon: BeakerIcon, name: 'Beaker' },
  { icon: BookOpenIcon, name: 'Book' },
  { icon: BriefcaseIcon, name: 'Briefcase' },
  { icon: BuildingOfficeIcon, name: 'Building' },
  { icon: ChartBarIcon, name: 'Chart' },
  { icon: CodeBracketIcon, name: 'Code' },
  { icon: CogIcon, name: 'Settings' },
  { icon: CommandLineIcon, name: 'Terminal' },
  { icon: ComputerDesktopIcon, name: 'Computer' },
  { icon: CubeIcon, name: 'Cube' },
  { icon: DocumentIcon, name: 'Document' },
  { icon: FolderIcon, name: 'Folder' },
  { icon: GlobeAltIcon, name: 'Globe' },
  { icon: LightBulbIcon, name: 'Idea' },
  { icon: PuzzlePieceIcon, name: 'Puzzle' },
  { icon: RocketLaunchIcon, name: 'Rocket' },
  { icon: SparklesIcon, name: 'Sparkles' },
  { icon: StarIcon, name: 'Star' },
  { icon: SwatchIcon, name: 'Design' },
  { icon: WrenchIcon, name: 'Tools' }
];

export const phaseIcons = [
  { icon: ClipboardDocumentListIcon, name: 'Planning' },
  { icon: CodeBracketIcon, name: 'Development' },
  { icon: AdjustmentsHorizontalIcon, name: 'Testing' },
  { icon: RocketLaunchIcon, name: 'Launch' },
  { icon: CircleStackIcon, name: 'Database' },
  { icon: CloudIcon, name: 'Deployment' }
];

export function getIconComponent(iconName) {
  const allIcons = [...projectIcons, ...phaseIcons];
  const iconConfig = allIcons.find(icon => icon.name === iconName);
  return iconConfig ? iconConfig.icon : RocketLaunchIcon;
}

export function getDefaultPhaseIcon(phaseId) {
  switch (phaseId) {
    case 'planning':
      return 'ClipboardDocumentList';
    case 'development':
      return 'CodeBracket';
    case 'testing':
      return 'AdjustmentsHorizontal';
    case 'launch':
      return 'RocketLaunch';
    default:
      return 'ClipboardDocumentList';
  }
} 