export type PageState =
  | 'welcome'
  | 'sad'
  | 'birthday'
  | 'gifts'
  | 'letter'
  | 'memories'
  | 'aditi';

export interface NavigationProps {
  currentPage: PageState;
  goToPage: (page: PageState) => void;
  birthdayCompleted: boolean;
  markBirthdayCompleted: () => void;
}

